<template>
    <div class="principal" @click="selectDay()">
        <div class="box-title">
            <p class="data">{{getDia()}}</p>
        </div>
        <div class="box-content">
            <div class="box-left">
                <img :src="getUrlImage(day.weather[0].icon)" alt="icone tempo">
                <p>{{day.weather[0].description}}</p>
            </div>
            <div class="box-center">
                <p><cloud-rain-icon class="icon-precipitation"></cloud-rain-icon>{{day.rain ? Math.round(day.rain) : 0}}mm</p>
            </div>
            <div class="box-right">
                <p><arrow-up-icon  class="icon-max-temperature"></arrow-up-icon>{{Math.round(day.temp.max)}}°</p>
                <p><arrow-down-icon class="icon-min-temperature"></arrow-down-icon>{{Math.round(day.temp.min)}}º</p>
            </div>
        </div>
    </div>
</template>

<script>

import ArrowUpIcon from 'vue-feather-icons/icons/ArrowUpIcon';
import ArrowDownIcon from 'vue-feather-icons/icons/ArrowDownIcon';
import CloudRainIcon from 'vue-feather-icons/icons/CloudRainIcon';

export default {
    name: "BoxDay",
    props: {
        day: {},
        indice: Number,
    },
    components: {
        ArrowUpIcon,
        ArrowDownIcon,
        CloudRainIcon
    },
    methods: {
        getUrlImage(icon){
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        },
        getDia(){
            
            if(this.indice===0){
                return "Hoje";
            }
            else{
                const date = new Date();
                date.setMilliseconds(date.getMilliseconds()+(this.indice*86400000));

                return this.getDiaSemana(date.getDay());
            }
        },
        selectDay(){
            this.$router.push('/details');
        },

        getDiaSemana(dia){
            if(dia===0){
                return "Domingo";
            }
            else if(dia===1){
                return "Segunda";
            }
            else if(dia===2){
                return "Terça";
            }
            else if(dia===3){
                return "Quarta";
            }
            else if(dia===4){
                return "Quinta";
            }
            else if(dia===5){
                return "Sexta";
            }
            else if(dia===6){
                return "Sábado";
            }
        }
    }
}
</script>

<style scoped>

div.principal{
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    box-shadow: 0 0 3px #999;
    margin-top: 10px;
    cursor: pointer;
}

div.principal:hover{
    box-shadow: 0 0 10px #999;
}

div.principal div.box-title{
    padding: 6px 0;
    display: flex;
    justify-content: center;
    background-color: #DDD;
}

div.principal div.box-title p{
    font-weight: bold;
    color: #999;
}

div.principal div.box-content{
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

div.principal div.box-content div.box-left img{
    width: 120px;
    margin-left: -10px;
}
div.principal div.box-content div.box-left p{
    font-weight: bold;
    font-size: 16px;
    color: #999;
    text-transform: capitalize;
}
div.principal div.box-content div.box-center{
    display: flex;
    align-items: flex-end;
}

div.principal div.box-content div.box-center p{
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: rgb(3, 68, 121);
}
div.principal div.box-content div.box-center p .icon-precipitation{
    margin-right: 5px;
}

div.principal div.box-content div.box-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
div.principal div.box-content div.box-right p{
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333;
    font-weight: bold;
}

div.principal div.box-content div.box-right p .icon-max-temperature{
    color: rgb(196, 28, 28);
}

div.principal div.box-content div.box-right p .icon-min-temperature{
    color: rgb(16, 97, 163);
}


</style>


