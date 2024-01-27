export default defineEventHandler(async (event) => {
  await sendRedirect(event, "https://p0nxx.vercel.app/", 302);
});
