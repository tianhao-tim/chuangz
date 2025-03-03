import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import { ComType, DatavComponent } from "@/datav/types/datav-component";
import { generateId } from "@/utils";

// 组件结构
export interface IComState {
	// 全部组件
	coms: DatavComponent[];
	// 子组件
	subComs: DatavComponent[];
}

export const findComIndex = (coms: DatavComponent[], id: string) => {
	return coms.findIndex(c => c.id === id);
};

const findCom = (coms: DatavComponent[], id: string) => {
	return coms.find(c => c.id === id);
};

const findComs = (coms: DatavComponent[], parentId?: string) => {
	return coms.filter(c => c.parentId === parentId);
};

export const useComStore = defineStore("com", {
	state: (): IComState => ({
		coms: [],
		subComs: []
	}),
	getters: {
		selectedCom(state) {
			return state.coms.find(m => m.selected);
		}
	},
	actions: {
		selectCom(id: string) {
			this.coms.forEach(com => {
				com.selected = com.id === id;
				com.hovered = false;
			});
		},
		setComs(payload: DatavComponent[]) {
			const coms: DatavComponent[] = [];
			const subComs: DatavComponent[] = [];
			payload.forEach(c => {
				if (c.type === ComType.com) {
					coms.push(c);
				} else if (c.type === ComType.subCom) {
					subComs.push(c);
				}
			});
			this.coms = coms;
			this.subComs = subComs;
		},
		async deleteCom(com: DatavComponent) {
			if (com.type === ComType.com) {
				this.coms.splice(findComIndex(this.coms, com.id), 1);
			} else {
				this.subComs.splice(findComIndex(this.subComs, com.id), 1);
			}
		},
		async addCom(com: DatavComponent) {
			this.coms.push(com);
		},
		async copyCom(id: string) {
			const getNewCom = (com: DatavComponent, parentId?: string) => {
				const ncom = cloneDeep(com);
				ncom.id = generateId(ncom.name.substring(1, ncom.name.length));
				ncom.alias += "_copy";
				ncom.attr.x += 30;
				ncom.attr.y += 30;

				ncom.hovered = false;
				ncom.selected = false;
				ncom.renameing = false;

				ncom.parentId = parentId;

				for (const key in ncom.apiData) {
					ncom.apiData[key].id = generateId();
					ncom.apiData[key].comId = ncom.id;
				}
				return ncom;
			};

			const ocom = findCom(this.coms, id);
			if (ocom) {
				const ncom = getNewCom(ocom);
				const nSubComs = findComs(this.subComs, ocom.id).map(m => getNewCom(m, ncom.id));
				this.coms.push(ncom);
				this.subComs.push(...nSubComs);
			}
		}
	}
});
