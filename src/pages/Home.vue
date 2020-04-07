<template>
    <div>
        <nav class="menu">
            <div class="title">
                <h1>Weather Now</h1>
                <div class="redes-sociais">
                    <a class="facebook" href="https://facebook.com" target="_blank">Facebook</a>
                    <a class="instagram" href="https://instagram.com" target="_blank">Instagram</a>
                    <a class="twitter" href="https://twitter.com" target="_blank">Twitter</a>
                </div>
            </div>
            <div class="content">
                <input v-model="cidade" type="text" placeholder="Cidade">

                <button v-if="!loading.buttonSearch" @click="getPrevisao()">
                    <img class="search" src="../assets/icon_pesquisa.png" alt="Pesquisa">
                </button>
                <div v-else class="box-image-search-load">
                    <img class="search" src="../assets/load.gif" alt="Pesquisa">
                </div>
            </div>
        </nav>
        <div class="main">
            <section v-if="atual.length!==0" class="box-current">
                <div class="box-current-dark">
                    <div class="box-current-right">
                        <h2>Tempo agora em {{cidadeView}}</h2>
                        <h3>{{getDataAtual()}}</h3>
                        <img :src="getUrlImage(atual.weather[0].icon)" alt="icone da previsão do tempo" />
                        <p>{{atual.weather[0].description}}</p>
                    </div>
                    <div class="box-current-left">
                        <p class="temperature"><span>Temperatura</span> {{Math.round(atual.temp)}}º</p>
                        <p class="sensation"><span>Sensação</span> {{Math.round(atual.feels_like)}}º</p>
                    </div>
                </div>
            </section>

            <section class="box-list-hourly">
                <BoxHourly v-for="item of horas" :key="item.dt" :hourly="item"/>
            </section>
            
            <section class="box-list-day">
                <BoxDay v-for="item of dias" :key="item.dt" :day="item" />
            </section>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import BoxDay from '../components/BoxDay';
import BoxHourly from '../components/BoxHourly';

export default {
    name: 'Home',
    data(){
        return{
            cidade: 'Quijingue',
            cidadeView: '',

            dias: [],
            horas: [],
            atual: [],

            loading: {
                buttonSearch: false
            },
            error: {
                cidade: {
                    err: false,
                    message: ''
                } 
            }
        }
    },
    components: {
        BoxDay,
        BoxHourly
    },
    
    methods: {
        async getPrevisao(){
            if(this.cidade){
                this.loading.buttonSearch = true;
                try{
                    const responseLatLong = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.cidade},br&cnt=16&units=metric&lang=pt_br&appid=a2c33fdd0019c87491399b6d35f1c715`);       
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatLong.data.city.coord.lat}&lon=${responseLatLong.data.city.coord.lon}&units=metric&lang=pt_br&appid=a2c33fdd0019c87491399b6d35f1c715`);
                    this.atual = response.data.current;
                    this.dias = response.data.daily;
                    this.horas = response.data.hourly;
                    this.error.cidade.err = false;
                    this.cidadeView = this.cidade;
                    
                } catch(err) {
                    this.atual = [];
                    this.dias = [];
                    this.horas = [];
                    this.error.cidade.err = true;
                    this.error.cidade.message = "Cidade não encontrada";
                }
                this.loading.buttonSearch = false;
            }
        },
        getDataAtual(){
            const date = new Date();

            const diaDoMes = date.getDate()<10 ? "0"+date.getDate(): date.getDate();
            const mes = date.getMonth()<10 ? "0"+(date.getMonth()+1): (date.getMonth()+1);

            const hora = date.getHours()<10 ? "0"+date.getHours(): date.getHours();
            const minuto = date.getMinutes()<10 ? "0"+date.getMinutes(): date.getMinutes();

            return ` ${hora}:${minuto} - ${diaDoMes}/${mes}/${date.getFullYear()}`;
        },
        getUrlImage(icon){
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        }
    }
}

</script>

<style scoped>

.menu .title{
    padding: 15px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url('../assets/menu_image.jpg');
}

.menu .title h1{
    color: rgb(255, 255, 255);
    margin-right: 20px;
    text-decoration: none;
    cursor: pointer;
}

.menu .title .redes-sociais a{
    text-decoration: none;
    margin-left: 20px;
    font-weight: bold;
}
.menu .title .redes-sociais a.facebook{
    color: #4267B2;
}
.menu .title .redes-sociais a.instagram{
    color: #F39B39;
}
.menu .title .redes-sociais a.instagram{
    color: #2AA9E0;
}

.menu .content{
    display: flex;
    padding: 10px 50px;
    align-items: center;
    background-color:  rgb(55, 137, 175);
}

.menu input{
    height: 40px;
    border: 0;
    border-radius: 5px;
    padding: 0 10px;
    width: 300px;
    font-size: 20px;
    margin-right: 10px;
    color: #555;
}
.menu input:focus{
    box-shadow: 0 0 5px rgb(198, 240, 203);
    outline: 0;
} 

.menu button{
    border: 0;
    width: 50px;
    height: 40px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    background-color: rgba(0,0,0,0);
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
}
div.box-image-search-load{
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
img.search{
    height: 30px;
}
.menu button:hover{
    opacity: .7;
}

div.main{
    margin: 0 50px;
    display: flex;
    flex-direction: column;
}

section.box-current{
    margin-top: 10px;
    box-shadow: 0 0 10px #666;
    border-radius: 3px;
    background-image: url('../assets/bg_weather.jpg');
}
section.box-current div.box-current-dark{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0,0,0,.8);
}
section.box-current div.box-current-dark h3{
    margin-top: 5px;
    font-size: 16px;
    color: #DDD;
}
section.box-current div.box-current-dark img{
    height: 150px;
}

section.box-current div.box-current-dark p{
    font-size: 25px;
    text-transform: capitalize;
    color: #FFF;
    font-weight: bold;
}

section.box-current div.box-current-dark div.box-current-right h2{
    color: #FFF;
}
section.box-current div.box-current-dark div.box-current-left{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

section.box-current div.box-current-dark div.box-current-left p.temperature{
    color: rgb(196, 28, 28);
    font-size: 40px;
    display: flex;
    align-items: center;
}
section.box-current div.box-current-dark div.box-current-left p.temperature span{
    font-size: 20px;
    font-weight: bold;
    color: #CCC;
    margin-right: 10px;
}
section.box-current div.box-current-dark div.box-current-left p.sensation{
    color: rgb(16, 97, 163);
    font-size: 40px;
    display: flex;
    align-items: center;
}
section.box-current div.box-current-dark div.box-current-left p.sensation span{
    font-size: 20px;
    font-weight: bold;
    color: #CCC;
    margin-right: 10px;
}

</style>