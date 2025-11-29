import React from "react";
import { Slider } from "./Components/Slider";
import { Hero } from "./Components/Jumbotron";
import bac from "./image/bac.jpg"


export const HomePage = () => (

    <div className="bg" style={{ backgroundColor: ' rgb(188, 198, 204)', backgroundSize: 'cover',height:'1310px'}}>
        <Hero
            title="Нам доверяют"
          
            subtitle="Elit enim dolor eu commodo deserunt consequat in nulla irure. Cillum ut enim ipsum ipsum dolor officia incididunt do eiusmod dolor ipsum irure adipisicing. Ullamco esse aliquip laborum ex Lorem ullamco excepteur ex elit dolore nisi nostrud. Officia occaecat duis Lorem anim. Commodo officia anim velit id Lorem id et cillum."
            bg={bac}
        />
        <Slider />
    </div>
  
);
