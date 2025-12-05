import mongoose ,{Document, Schema, Types} from "mongoose"

export interface IMessage extends Document{
    chatID:Types.ObjectId;
    sender:string;
    text?:string;
    image?:{
        url:string;
        published:String;
    };
    messageType:"text" |"image";
    seen:boolean;
    seenAt? : Date;
    createdAt:Date;
    updatedAt:Date;
}

const schema = new Schema<IMessage>({
    chatID:{
        type:Schema.Types.ObjectId,
        ref:"Chat",
        required:true,
    },
    sender:{
        type:String,
        required:true
    },
    text:String,
    image:{
        url:String,
        published:String,
    },
    messageType:{
        type:String,
        enum:["text","image"],
        default:"text"
    },
    seen:{
        type:Boolean,
        default:false
    },
    seenAt:{
        type:Date,
        default:null
    },
},{
    timestamps:true
})

export const Messages = mongoose.model<IMessage>("Messages",schema)