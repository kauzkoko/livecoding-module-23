<template>
  <div text-white v-for="test in inventarRicardo">{{ test.produktname }}</div>
  <button @click="diesdas">add diesdas</button>
  <button @click="update">update table list</button>
</template>

<script setup>
console.log("test");
const supabase = useSupabaseClient();
let inventarRicardo = ref();

const update = async () => {
  let { data, error } = await supabase.from("inventar-ricardo").select("*");
  inventarRicardo.value = data;
};
update();

const diesdas = async () => {
  const { data, error } = await supabase
    .from("inventar-ricardo")
    .insert([{ produktname: "diesdas", preis: 50 }, { produktname: "zwei" }])
    .select();
};


const { data, error } = await supabase.auth.signInWithPassword({
  email: 'example@email.com',
  password: 'example-password',
})

</script>
