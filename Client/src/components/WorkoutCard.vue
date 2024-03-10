<script setup lang="ts">
import {ref} from "vue";
import {type Workout} from "@/model/workouts";
import "@fortawesome/fontawesome-free/css/all.css";

const isHidden = ref(false);

const workout = ref<Workout>({
    "user": {
        "id": 31,
        "admin": true,
        "firstName": "Ari",
        "lastName": "Yeger",
        "maidenName": "",
        "age": 24,
        "gender": "male",
        "email": "yegera1@newpaltz.edu",
        "phone": "845-608-4114",
        "username": "L10nhunter",
        "password": "Testing123!",
        "birthDate": "1999-04-11",
        "image": "",
        "bloodGroup": "A-",
        "height": 170,
        "weight": 107.2,
        "eyeColor": "Brown",
        "hair": {
            "color": "Brown",
            "type": "Wavy"
        },
        "domain": "ow.ly",
        "ip": "97.11.116.84",
        "address": {
            "address": "249 Shady Brook Lane",
            "city": "Pomona",
            "coordinates": {
                "lat": 38.9149499,
                "lng": -77.01170259999999
            },
            "postalCode": "10970",
            "state": "NY"
        },
        "macAddress": "42:87:72:A1:4D:9A",
        "university": "Poznan School of Banking",
        "bank": {
            "cardExpire": "02/24",
            "cardNumber": "6331108070510590026",
            "cardType": "switch",
            "currency": "Zloty",
            "iban": "MT70 MKRC 8244 59Z4 9UG1 1HY7 TKM6 1YX"
        },
        "company": {
            "address": {
                "address": "816 West 19th Avenue",
                "city": "Anchorage",
                "coordinates": {
                    "lat": 61.203221,
                    "lng": -149.898655
                },
                "postalCode": "99503",
                "state": "AK"
            },
            "department": "Support",
            "name": "Balistreri-Kshlerin",
            "title": "Quality Engineer"
        },
        "ein": "51-7727524",
        "ssn": "534-76-0952",
        "userAgent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11",
        "crypto": {
            "coin": "Bitcoin",
            "wallet": "0xb9fc1004bfe7702de522516cf34a5da41c4ef2b5",
            "network": "Ethereum (ERC20)"
        }
    },
    "id": "1",
    "title": "Workout 1",
    "date": "2024-03-10",
    "time": "11:13 AM",
    "distance": 18000,
    "duration": 60,
    "location": {
        "latitude": "37.7749",
        "longitude": "-122.4194"
    },
    "picture": "./public/images/1.png",
    "type": "Strength"
})

function distanceFormat(distance?: number): string {
    if(!distance) return "0ft";
    if(distance >= 5280) return (distance / 5280).toFixed(2) + "mi";
    return distance + "ft";
}

function durationFormat(duration?: number): string {
    if(!duration) return "0m";
    const hours = Math.floor(duration / 60);
    const hoursString = hours < 10 ? "0" + hours : hours;
    const minutes = duration % 60;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    return hoursString + ":" + minutesString;
}

function howLongAgo(date: string, time: string): string {
    const now = new Date();
    const then = new Date(date);
    const timeArray = time.split(" ");
    const HP = parseInt(timeArray[0].split(":")[0]);
    const Hours = timeArray[1] == 'PM' ? HP + 12 : HP;
    const Minutes = parseInt(timeArray[0].split(":")[1]);
    then.setHours(Hours);
    then.setMinutes(Minutes);
    console.log(now.getTime(), then.getTime());
    const diff = now.getTime() - then.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    console.log(years, months, weeks, days, hours, minutes%60, seconds%60)
    if (years > 0) return years + "y";
    if (months > 0) return months + "m";
    if (weeks > 0) return weeks + "w";
    if (days > 0) return days + "d";
    if (hours > 0) return hours + "h";
    if (minutes > 0) return minutes + "m";
    return seconds + "s";
}


</script>

<template>
    <div class="box default-color-scheme" :class="isHidden && 'is-hidden'">
        <article class="media default-color-scheme">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img :src="workout.user.image" alt="Image">
                </figure>
            </div>
            <div class="media-content default-color-scheme">
                <div class="content default-color-scheme">
                    <p>
                        <span class="default-color-scheme has-text-weight-bold">{{ workout.user.firstName }} {{ workout.user.lastName }}</span>
                        &nbsp;
                        <small class="has-soft-color">@{{ workout.user.username }}</small>
                        &nbsp;
                        <small class="has-soft-color">{{ howLongAgo(workout.date, workout.time) }}</small>
                        <br>
                        {{ workout.title }} - {{ workout.location}}
                        <span class="columns default-color-scheme">
                            <span class="column has-text-centered default-color-scheme">
                                <span class="is-size-2 default-color-scheme">{{ distanceFormat(workout.distance) }} </span>
                                <br>
                                <span class="is-size-7 has-soft-color">Distance</span>
                            </span>
                            <span class="column has-text-centered">
                                <span class="is-size-2 default-color-scheme">{{ durationFormat(workout.duration) }} </span>
                                <br>
                                <span class="is-size-7 has-soft-color">Duration</span>
                            </span>
                        </span>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item" aria-label="reply">
                            <span class="icon is-small">
                              <i class="fas fa-reply" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item" aria-label="retweet">
                            <span class="icon is-small">
                              <i class="fas fa-retweet" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item" aria-label="like">
                        <span class="icon is-small">
                          <i class="fas fa-heart" aria-hidden="true"></i>
                        </span>
                        </a>
                    </div>
                </nav>
            </div>
            <div class="media-right">
                <button class="delete" @click="isHidden = true" aria-label="close"/>
            </div>
        </article>
    </div>

</template>

<style scoped>
button.delete {
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.columns {
    margin: 0;
}

</style>