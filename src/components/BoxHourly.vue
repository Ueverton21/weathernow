<template>
    <div>
        {{hourly.weather[0].description}}
    </div>
</template>

<script>
export default {
    name: "BoxHourly",
    props: {
        hourly: {}
    }
}
</script>

