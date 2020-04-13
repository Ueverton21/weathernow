<template>
    <div>
        <nav class="menu">
            <div class="title">
                <div class="box-dark">
                    <h1>Weather Now</h1>
                    <div class="redes-sociais">
                        <a class="facebook" href="https://facebook.com" target="_blank"><facebook-icon></facebook-icon></a>
                        <a class="instagram" href="https://instagram.com" target="_blank"><instagram-icon></instagram-icon></a>
                        <a class="twitter" href="https://twitter.com" target="_blank"><twitter-icon></twitter-icon></a>
                    </div>
                </div>
            </div>
            <div class="content">
                <input v-model="cidade" type="text" placeholder="Cidade">

                <button v-if="!loading.buttonSearch" @click="getPrevisao()">
                    <img class="search" src="../assets/icon_pesquisa.png" alt="Pesquisa">
                </button>
            </div>
        </nav>
        <div class="main">
            <img class="load-page" v-if="loading.buttonSearch" src="../assets/load.gif" alt="carregando...">

            <div v-if="error.cidade.err" class="erro-cidade">
                <p>{{error.cidade.message}}</p>
            </div>

            <section v-if="atual.length!==0" class="box-current">
                <div class="box-current-dark">
                    <div class="box-current-right">
                        <h2>Tempo agora em <span>{{cidadeView}}</span></h2>
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

            <section class="box-buttons" v-if="atual.length!==0">
                <button :class="viewHoras ? 'selected': ''" @click="selectViewHoras()">48 Horas</button>
                <button :class="viewSemana ? 'selected': ''" @click="selectViewSemana()">7 Dias</button>
            </section>

            <section v-if="viewHoras" class="box-list-hourly">
                <BoxHourly v-for="(item, index) in horas" :key="item.dt" :indice="index" :hourly="item"/>
            </section>
            
            <section v-if="viewSemana" class="box-list-day">
                <BoxDay v-for="(item, index) of dias" :key="item.dt" :indice="index" :day="item" />
            </section>
        </div>
        <footer>
            <a href="https://github.com/Ueverton21" target="blank">Ueverton &copy;</a>
            <github-icon></github-icon>
        </footer>
    </div>
</template>

<script>

import axios from 'axios';
import BoxDay from '../components/BoxDay';
import BoxHourly from '../components/BoxHourly';

import FacebookIcon from 'vue-feather-icons/icons/FacebookIcon';
import TwitterIcon from 'vue-feather-icons/icons/TwitterIcon';
import InstagramIcon from 'vue-feather-icons/icons/InstagramIcon';
import GithubIcon from 'vue-feather-icons/icons/GithubIcon';

export default {
    name: 'Home',
    data(){
        return{
            cidade: localStorage.getItem('city') ? localStorage.getItem('city') : 'São Paulo',
            cidadeView: '',

            dias: [],
            horas: [],
            atual: [],

            viewSemana: false,
            viewHoras: true,

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
    created(){
        this.getPrevisao();
    },
    components: {
        BoxDay,
        BoxHourly,
        FacebookIcon,
        TwitterIcon,
        InstagramIcon,
        GithubIcon
    },
    
    methods: {
        async getPrevisao(){
            this.loading.buttonSearch = true;
        
            try{
                const responseLatLong = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.cidade},br&cnt=16&units=metric&lang=pt_br&appid=a2c33fdd0019c87491399b6d35f1c715`);       
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatLong.data.city.coord.lat}&lon=${responseLatLong.data.city.coord.lon}&units=metric&lang=pt_br&appid=a2c33fdd0019c87491399b6d35f1c715`);
                this.atual = response.data.current;
                this.dias = response.data.daily;
                this.horas = response.data.hourly;
                this.error.cidade.err = false;
                this.cidadeView = this.cidade;
                localStorage.setItem('city',this.cidade);
                this.cidade = "";

            } catch(err) {
                this.atual = [];
                this.dias = [];
                this.horas = [];
                this.error.cidade.err = true;
                this.error.cidade.message = "Cidade não encontrada";
            }
            this.loading.buttonSearch = false;
            
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
            return `https://openweathermap.org/img/wn/${icon}@2x.png`;
        },
        selectViewHoras(){
            this.viewHoras = true;
            this.viewSemana = false;
        },
        selectViewSemana(){
            this.viewHoras = false;
            this.viewSemana = true;
        },
    }
}

</script>

<style scoped>

.menu .title{
    background-image: url('../assets/menu_image.jpg');
}
.menu .title .box-dark{
    padding: 15px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,.8);
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
.menu .title .redes-sociais a.twitter{
    color: #2AA9E0;
}

.menu .title .redes-sociais a:hover{
    opacity: .5;
}

.menu .content{
    display: flex;
    padding: 10px 50px;
    align-items: center;
    background-color: rgb(41, 113, 138);
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
div.erro-cidade{
    margin: 10px 0 600px 0;
}
div.erro-cidade p{
    padding: 5px;
    color: rgb(182, 48, 48);
    font-size: 18px;
    font-weight: bold;
}

img.load-page{
    width: 150px;
    height: 150px;
    margin: 200px auto;
}

section.box-current{
    margin-top: 20px;
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
section.box-current div.box-current-dark div.box-current-right h2 span{
    text-transform: capitalize;
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

section.box-buttons{
    margin-top: 10px;
}

section.box-buttons button{
    padding: 10px 12px;
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
    border: 0;
    background-color: #CCC;
    border-radius: 3px;
    font-weight: bold;
    color: #222;
}
section.box-buttons button:focus{
    outline: none;
}
section.box-buttons button.selected{
    border: 2px solid #888;
}

div.main section.box-list-hourly{
    margin-top: 10px;
    box-shadow: 0 0 10px #666;
    border-radius: 3px;
}

div.main section.box-list-day{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10px;
}

footer{
    background-color: rgb(41, 113, 138);
    margin-top: 20px;
    padding: 20px 50px;
    display: flex;
    justify-content: center;
}

footer{
    display: flex;
    align-items: center;
    color: #FFF;
}
footer a{
    margin: 0 10px 0 0;
    text-decoration: none;
    color: #FFF;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    transition: .3s;
}
footer a:hover{
    opacity: .6;
}

</style>