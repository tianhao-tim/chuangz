<template>
	<div>
		<el-alert class="mb10" title="本地存储建议使用nginx为上传目录配置访问域名" type="success" />
		<el-form ref="fileEnvConfig" :model="form" label-width="150px">
			<el-form-item label="存储平台" prop="ossType" :rules="[{ required: true, message: '请选择存储平台', trigger: 'blur' }]">
				<el-select v-model="form.ossType" placeholder="请选择存储平台">
					<el-option label="阿里云" value="ALIYUN" />
					<el-option label="七牛云" value="QINIU" />
					<el-option label="腾讯" value="TENCENT" />
					<el-option label="又拍云" value="UPYUN" />
					<el-option label="本地" value="LOCAL" />
					<el-option label="通用S3" value="S3" />
				</el-select>
			</el-form-item>
			<el-form-item
				v-if="form.ossType !== 'LOCAL'"
				label="AccessKeyID"
				prop="accessKeyId"
				:rules="[{ required: true, message: '请输入AccessKeyID', trigger: 'blur' }]"
			>
				<el-input v-model="form.accessKeyId" placeholder="请输入AccessKeyID" />
			</el-form-item>
			<el-form-item
				v-if="form.ossType !== 'LOCAL'"
				label="AccessKeySecret"
				prop="accessKeySecret"
				:rules="[{ required: true, message: '请输入AccessKeySecret', trigger: 'blur' }]"
			>
				<el-input v-model="form.accessKeySecret" placeholder="请输入accessKeySecret" />
			</el-form-item>
			<el-form-item
				v-if="form.ossType === 'ALIYUN' || form.ossType === 'S3'"
				label="Endpoint"
				prop="endpoint"
				:rules="[{ required: true, message: '请输入Endpoint', trigger: 'blur' }]"
			>
				<el-input v-model="form.endpoint" placeholder="请输入Endpoint" />
			</el-form-item>
			<el-form-item
				v-if="form.ossType === 'TENCENT'"
				label="Region"
				prop="endpoint"
				:rules="[{ required: true, message: '请输入Region', trigger: 'blur' }]"
			>
				<el-input v-model="form.endpoint" placeholder="请输入Region" />
			</el-form-item>
			<el-form-item
				v-if="form.ossType !== 'LOCAL'"
				label="bucketName"
				prop="bucketName"
				:rules="[{ required: true, message: '请输入bucketName', trigger: 'blur' }]"
			>
				<el-input v-model="form.bucketName" placeholder="请输入bucketName" />
			</el-form-item>
			<el-form-item
				v-if="form.ossType === 'LOCAL'"
				label="存储路径"
				prop="uploadFolder"
				:rules="[{ required: true, message: '请输入存储路径', trigger: 'blur' }]"
			>
				<el-input v-model="form.uploadFolder" placeholder="请输入存储路径" />
			</el-form-item>
			<el-form-item
				label="子目录"
				prop="prefixPath"
				v-if="form.ossType !== 'LOCAL'"
				:rules="[
					// { required: true, message: '请输入如 image 格式 不能携带符号', trigger: 'blur' },
					{ pattern: /^[a-zA-Z0-9]*$/, message: '请输入如 image 格式 不能携带符号', trigger: 'blur' }
				]"
			>
				<el-input v-model="form.prefixPath" placeholder="请输入文件存储子目录" />
			</el-form-item>
			<el-form-item
				label="访问域名"
				prop="domain"
				:rules="[
					{ required: true, message: '请输入能访问文件的域名', trigger: 'blur' }
					// { pattern: /^(https?:\/\/[^\/]+)$/, message: '请输入域名 如 https://oss.tduckcloud.com', trigger: 'blur' }
				]"
			>
				<el-input v-model="form.domain" placeholder="请输入能访问文件的域名" />
			</el-form-item>
			<el-form-item v-if="form.ossType === 'S3'" label="regionName" prop="regionName">
				<el-input v-model="form.regionName" placeholder="请输入regionName" />
			</el-form-item>
			<el-form-item v-if="form.ossType === 'S3'" label="acl" prop="acl">
				<el-select v-model="form.acl" placeholder="请选择acl">
					<el-option label="Private" value="Private"></el-option>
					<el-option label="PublicRead" value="PublicRead"></el-option>
					<el-option label="PublicReadWrite" value="PublicReadWrite"></el-option>
					<el-option label="AuthenticatedRead" value="AuthenticatedRead"></el-option>
					<el-option label="LogDeliveryWrite" value="LogDeliveryWrite"></el-option>
					<el-option label="BucketOwnerRead" value="BucketOwnerRead"></el-option>
					<el-option label="BucketOwnerFullControl" value="BucketOwnerFullControl"></el-option>
					<el-option label="AwsExecRead" value="AwsExecRead"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit"> 保存 </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import ConfigMixin from "./ConfigMixin";

export default {
	name: "OssConfig",
	mixins: [ConfigMixin],
	data() {
		return {};
	},
	async created() {
		this.activeName = "fileEnvConfig";
		await this.handleClick();
	},
	mounted() {}
};
</script>

<style scoped></style>
