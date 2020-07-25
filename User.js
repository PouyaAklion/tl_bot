const {mongoose} = require('./mongoose');

let User = mongoose.model('user',{
    id:{
        type:Number,
        default:0,
        require:true
    },
    username:{
        type:String,
        
    },
    // password:{
    //     type:String
    // },
    fullname:{
        type:String
    },
    requestCount:{
        type:Number,
        default:0
    },
    payments:[
        {
            date:{
                type:Date,
                default:null
            },
            amount:{
                type:Number,
                default:0
            },
            cartNumber:{
                type:Number,
                default:0
            },
            status:{
                code:{
                    type:Number,
                    default:0
                },
                text:{
                    type:String,
                    default:null
                }
            }
        }

    ],
    subscriptions:[
        {
            id:{
                type:Number,
                default:0,
            },
            level:{
                type:Number,
                default:0
            },
            startDate:{
                type:Date,
                default:null
            },
            allowedRequestsCount:{
                type:Number,
                default:0
            }

        }
    ],
    
})

module.exports = {User};