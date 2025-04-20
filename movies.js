const movies =[
    {title:"a" ,year:"2014",rating:"4.1"},
    {title:"b" ,year:"2014",rating:"3.1"},
    {title:"c" ,year:"2016",rating:"4.5"},
    {title:"d" ,year:"2017",rating:"4.8"}
];


    
 const title =  movies.filter(m=>m.year>=2016&&m.rating>=4)
                .sort((a,b) =>a.rating=b.rating)
                .reverse()
                .map(m=>m.title)

                console.log(title);
