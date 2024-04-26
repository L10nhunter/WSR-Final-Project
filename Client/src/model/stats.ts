import {getWorkoutByType, getWorkoutsByUser} from "@/model/workouts";
import {getSession} from "@/model/session";
export interface Stats{
    distance: number;
    duration: number;
    pace: number;
    calories: number;
}
export async function getAllTimeStats(type?: string){
    return await getStats(0, type);
}
export async function getWeekStats(type?: string){
    const date = new Date();
    return await getStats(date.setHours(date.getHours() - 168), type);
}
export async function getTodayStats(type?: string){
    const date = new Date();
    return await getStats(date.setHours(date.getHours() - 24), type)
}

async function getStats(time: number, type?: string) : Promise<Stats>{
    if(!getSession().user) return {distance: 0, duration: 0, pace: 0, calories: 0};
    const workouts = !type ? await getWorkoutsByUser(getSession().user ?? undefined) : await getWorkoutByType(type, getSession().user ?? undefined);
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