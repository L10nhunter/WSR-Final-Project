import {getWorkoutByType, getWorkoutsByUser} from "@/model/workouts";
import {ref} from "vue";
import {getUser} from "@/model/session";
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
    if(!getUser()) return {distance: 0, duration: 0, pace: 0, calories: 0};
    const workouts = !type ? getWorkoutsByUser(getUser() ?? undefined) : getWorkoutByType(type, getUser() ?? undefined);
    const stats: Stats = {
        distance: 0,
        duration: 0,
        pace: 0,
        calories: 0
    }
    for(const workout of workouts){
        if(workout.time && workout.time > time){
            stats.distance += workout.distance ?? 0;
            stats.duration += workout.duration ?? 0;
            stats.calories += workout.calories ?? 0;
        }
    }
    stats.pace = ((stats.distance/5280) / (stats.duration/60));
    return stats;
}