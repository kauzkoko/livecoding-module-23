<template>
  <div>to string qr code</div>
</template>

<script setup>
import QRCode from "qrcode";
QRCode.toString(
  "http://www.google.com",
  { type: "utf-8" },
  function (err, string) {
    if (err) throw err;
    console.log(string);
  }
);
</script>
