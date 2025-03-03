import { useRefHistory } from "@vueuse/core";
import { usePosterStore } from "@/store/modules/poster";
import { storeToRefs } from "pinia";

const posterStore = usePosterStore();

const { posterWidgetList } = storeToRefs(posterStore);

const { history, undo, redo } = useRefHistory(posterWidgetList, {
	deep: true,
	capacity: 15 // limit to 15 history records
});

export default () => {
	return {
		history,
		undo,
		redo
	};
};
