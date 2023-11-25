export const useQRSocket = () => {
  const supabase = useSupabaseClient();
  let receivedCursorPosition, channel, MOUSE_EVENT;
  let sendQrData = ref(Function);
  let x = ref(0);
  let y = ref(0);
  let rawValue = ref(0);
  onMounted(() => {
    channel = supabase.channel("room_1");
    console.log(channel);

    channel
      .on("broadcast", { event: "qr" }, (event) => {
        receivedCursorPosition(event);
      })
      .subscribe();

    receivedCursorPosition = ({ event, payload }) => {
      console.log(payload);
      x.value = payload.x;
      y.value = payload.y;
      rawValue.value = payload.rawValue;
    };

    sendQrData.value = (userId, x, y, rawValue) => {
      return channel.send({
        type: "broadcast",
        event: "qr",
        payload: { userId, x, y, rawValue },
      });
    };
  });
  return { x, y, rawValue, sendQrData };
};
