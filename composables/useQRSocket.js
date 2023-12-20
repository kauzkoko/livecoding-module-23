export const useQRSocket = () => {
  const supabase = useSupabaseClient();
  let receivedCursorPosition, channel;
  let sendQrData = ref(Function);
  let x = ref(0);
  let y = ref(0);
  let rawValue = ref(0);
  let cornerPoints = ref();

  onMounted(() => {
    channel = supabase.channel("qr-room");
    console.log(channel);

    channel
      .on("broadcast", { event: "qr" }, (event) => {
        receivedCursorPosition(event);
      })
      .subscribe();

    receivedCursorPosition = ({ event, payload }) => {
      x.value = payload.x;
      y.value = payload.y;
      rawValue.value = payload.rawValue;
      cornerPoints.value = payload.cornerPoints;
    };

    sendQrData.value = (userId, x, y, rawValue, cornerPoints) => {
      return channel.send({
        type: "broadcast",
        event: "qr",
        payload: { userId, x, y, rawValue, cornerPoints },
      });
    };
  });
  return { x, y, rawValue, sendQrData, cornerPoints };
};
