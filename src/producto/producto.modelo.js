import mongoose, { Schema } from "mongoose";

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre el obligatorio']
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "Categoria"
    },
    existencia:{
        type: Number,
        required:[true, 'La existencia es obligatoria'],
        default: 0,
    },
    cantidadVentas:{
        type: Number,
        required: 0
    },
    estado:{
        type: Boolean,
        default: true
    }
})

ProductoSchema.methods.toJSON = function(){
    const { __v, _id, ...restoP } = this.toObject();
    restoP.uid = _id;
    return restoP;
};

export default mongoose.model("Producto", ProductoSchema);



