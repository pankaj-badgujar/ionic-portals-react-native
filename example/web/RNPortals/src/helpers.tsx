import { publish } from "@ionic/portals"

export const printWebLogOnMetro = (message: string) => {
    publish({ topic: 'console:log', data: { message } });
}