export const useQrSequencer = () => {
  const supabase = useSupabaseClient();
  let channel;
  let sendQrData = ref(Function);
  let event = "qr-data";
  let channelName = "qr-sequencer";

  onMounted(() => {
    channel = supabase.channel(channelName);

    channel
      .on("broadcast", { event }, (event) => {
        console.log("received event", event);
      })
      .subscribe();

    sendQrData.value = (qrData) => {
      console.log("will send", qrData);
      return channel.send({
        type: "broadcast",
        event,
        payload: { qrData },
      });
    };
  });
  return { sendQrData };
};
