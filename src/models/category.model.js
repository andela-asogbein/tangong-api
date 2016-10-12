import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let categorySchema = new Schema({
	name : {
		type : 'String',
		required : 'Category name is required'
	},
	description : {
		type: 'String',
	},
	iconLink: {
		type: 'String'
	}
});

export default mongoose.model("Category", categorySchema);
