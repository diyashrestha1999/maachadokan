<template>
    <h1>These are product in category</h1>
    
</template>
<script>
// import axios from 'axios'

export default {
data(){
    return{
        id: this.$route.params.id,
    }
},
methods:{
    // getProductInCAtegory(){
    //     axios({
    //         method:"get",
    //         url:`http://127.0.0.1:8000/api/product/{}`
    //     })
    // }
}
}
</script>
