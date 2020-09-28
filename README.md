In this section,i have an array of object which contain actually two types of value one is **key** which is string and another one is **value** which is array of object.
The data structure:
`code`
data =[
   {
    'key':string,
    'value':[time:...,value:number]
    },
    {
    'key':string,
    'value':[time:...,value:number]
    }
]
I have a line generator function(**myLine**) where i pass this data's value and add some attribute specially the **opacity** attribute.Here i use foreach function because of creating multiline.
I create three checkbox and each checkbox has **onChange** function which change the opacity attribute(0 to 1 or 1 to 0) of the line.