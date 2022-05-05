module.exports=(sequelize,DataTypes)=>{
    const Posts = sequelize.define("Posts",{
        nom:{
            type     :DataTypes.STRING,
            allowNull:false
        },
        description:{
            type      :DataTypes.STRING,
            allowNull :false
        },
         username:{
            type      :DataTypes.STRING,
            allowNull :false
        }
    })

    Posts.associate=(models)=>{
       Posts.hasMany(models.Comments,{
           ondelete:'cascade'
       })
       
       }
    return Posts
}
