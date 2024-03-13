import {getWorkoutByType, getWorkoutsByUser} from "@/model/workouts";
import {LoggedInUser} from "@/model/users";
import {ref} from "vue";
export interface Stats{
    distance: number;
    duration: number;
    pace: number;
    calories: number;
}
export const type = ref("All");

export function getAllTimeStats(type?: string){
    return getStats(0, type);
}
export function getWeekStats(type?: string){
    const date = new Date();
    return getStats(date.setHours(date.getHours() - 168), type);
}
export function getTodayStats(type?: string){
    const date = new Date();
    return getStats(date.setHours(date.getHours() - 24), type)
}

function getStats(time: number, type?: string) : Stats{
    const workouts = !type ? getWorkoutsByUser(LoggedInUser.value) : getWorkoutByType(type, LoggedInUser.value);
    const stats: Stats = {
        distance: 0,
        duration: 0,
        pace: 0,
        calories: 0
    }
    for(const workout of workouts){
        if(workout.time > time){
            stats.distance += workout.distance ?? 0;
            stats.duration += workout.duration;
            stats.calories += workout.calories ?? 0;
        }
    }
    stats.pace = ((stats.distance/5280) / (stats.duration/60));
    return stats;
}