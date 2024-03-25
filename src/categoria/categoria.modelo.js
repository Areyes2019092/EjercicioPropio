import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "La categoria es obligatoria"]
    },
    estado:{
        type: Boolean,
        default: true
    },
});

CategoriaSchema.methods.toJSON = function(){
    const { __v, _id, ...restoC } = this.toObject();
    restoC.uid = _id;
    return restoC;
}

export default mongoose.model("Categoria", CategoriaSchema);