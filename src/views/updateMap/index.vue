<template>
    <div>
        <mapContainer :myId="'vueMap2'"></mapContainer>
    </div>
</template>

<script>
    import mapContainer from "components/map/map";
    export default {
        name: "index",
        data(){
            return {

            }
        },
        components: {
            mapContainer
        }
    }
</script>

<style scoped>

</style>
