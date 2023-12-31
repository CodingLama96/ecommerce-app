<script setup>

    import { ref , onMounted } from "vue";
    import axios from "axios";

    const user = ref();
    onMounted(async()=>{
        const data = await axios.get("/user");
        user.value = data.data;
        console.log(user.value);
    })

</script>