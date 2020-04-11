<template>
    <div>
        <div class="box-title" v-if="indice===0">
            <div>
                <p>Condições do tempo</p>
            </div>
            <div class="box-temp">
                <p>Temperatura</p>
                <p>Sensação</p>
            </div>
        </div>
        <div class="principal">
            <div class="box-left">
                <img :src="getUrlImage(hourly.weather[0].icon)" alt="Icone tempo">
                <div>
                    <div class="box-hora" >
                        <span v-if="novoDia()">{{getTextDia()}}</span>
                        <p class="hora">{{getHour()}}</p>
                    </div>
                    <p class="descricao">{{hourly.weather[0].description}}</p>
                </div>
            </div>
            <div class="box-right">
                <p class="temperatura">{{Math.round(hourly.temp)}}°</p>
                <p class="sensacao">{{Math.round(hourly.feels_like)}}º</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BoxHourly",
    props: {
        hourly: {},
        indice: Number,
    },
    methods: {
        getUrlImage(icon){
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        },
        getHour(){
            const date = new Date();
            date.setMilliseconds(date.getUTCMilliseconds()+(this.indice*3600000));
            return date.getHours() < 10 ? "0"+ date.getHours()+":00": date.getHours()+":00";
        },
        novoDia(){
            const date = new Date();
            return (date.getHours()+this.indice) > 24; 
        },

        getTextDia(){
            const date = new Date();
            if((date.getHours()+this.indice) > 24 && (date.getHours()+this.indice) <= 48 ){
                return "Amanhã";
            }
            else if((date.getHours()+this.indice) > 48){
                const dataDoisDias = new Date();
                dataDoisDias.setDate(dataDoisDias.getDate()+2);

                const diaDoMes = dataDoisDias.getDate()<10 ? "0"+dataDoisDias.getDate(): dataDoisDias.getDate();
                const mes = dataDoisDias.getMonth()<10 ? "0"+(dataDoisDias.getMonth()+1): (dataDoisDias.getMonth()+1);

                return `${diaDoMes}/${mes}/${dataDoisDias.getFullYear()} `;
            }
        }

    }
}
</script>

<style scoped>
div.box-title{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #DDD;
}
div.box-title p{
    margin-left: 20px;
    font-size: 16px;
    color: rgb(114, 114, 114);
    font-weight: bold;
}
div.box-title div.box-temp{
    display: flex;
}
div.principal{
    padding: 5px;
    box-shadow: 1px 0 2px #CCC;
    display: flex;
    justify-content: space-between;
}
div.principal img{
    height: 50px;
}
div.principal div.box-left{
    display: flex;
    align-items: center;
}
div.principal div.box-hora{
    display: flex;
    align-items: center;
}
div.principal div.box-hora span{
    margin-right: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #444;
}
div.principal div.box-hora p{
    color: #666;
    display: flex;
    font-size: 14px;
    font-weight: bold;
}
div.principal p.descricao{
    color: #888;
    font-size: 16px;
    font-weight: 500;
}

div.principal div.box-right{
    display: flex;
    align-items: center;
}
div.principal div.box-right p{
    font-size: 16px;
    font-weight: bold;
}

div.principal div.box-right p.temperatura{
    margin-right: 80px;
    color: rgb(196, 28, 28);
}
div.principal div.box-right p.sensacao{
    margin-right: 20px;
    color: rgb(16, 97, 163);
}

</style>


