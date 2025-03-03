import { reactive, ref } from "vue";
export default () => {
	const list = reactive([
		{
			name: 1
		}
	]);

	const a = ref("a");
	return {
		list,
		a
	};
};
