import { ref } from "vue";
import { getPosterTemplateList } from "@/api/modules/poster";

const templateList = ref([]);

const getPosterTemplates = () => {
	getPosterTemplateList().then(res => {
		if (res.data) {
			templateList.value = res.data;
		}
	});
};

export default () => {
	return {
		templateList,
		getPosterTemplates
	};
};
