import { createPinia, defineStore } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import piniaPersistConfig from "./config/piniaPersist";
import { getToken, removeToken, setToken } from "@/utils/auth";

export interface IUserState {
	token: string;
	userInfo: any;
}

export const useGlobalStore = defineStore("globalState", {
	state: (): IUserState => ({
		token: getToken(),
		userInfo: {}
	}),
	actions: {
		// set token
		setToken(token: string) {
			this.token = token;
			setToken(token);
		},
		// set userInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		logout() {
			removeToken();
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPersist);
export default pinia;
