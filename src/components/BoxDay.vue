<template>
    <div>
        {{day.weather[0].description}}
    </div>
</template>

<script>
export default {
    name: "BoxDay",
    props: {
        day: {}
    }
}
</script>

