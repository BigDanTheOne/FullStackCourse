import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import EventCard from "./EventCard"

export default function TeamCard({places, slider}) {
  const cards = []
    if (slider === true)  {
        cards.push(
            <Grid item xs={12} md={12} lg={12}>
                <div style={{height: "0px"}}/>
            </Grid>
        )
    }
  for (let i = 0; i < places.length; i++) {
    cards.push(
        <Grid item xs={12} md={12} lg={12}>
          <EventCard
              thumbnail={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHCBAj8nRJkEwjWg5TpNuSZZG9iscsf43V1mfx0LZHNDYW3S_&usqp=CAU'}
              title={places[i].category}
              subtitle={places[i].title}
              description={places[i].description}
              joined={places[i].joined}
          />
        </Grid>
    )
  }
    if (slider === true)  {
        cards.push(
            <Grid item xs={12} md={12} lg={12}>
                <div style={{height: "56px"}}/>
            </Grid>
        )
    }
    console.log("rendering.,...")
    console.log(cards)
    return (
      <>
        <NoSsr>
          <GoogleFontLoader fonts={[{ font: 'Ubuntu', weights: [400, 700] }]} />
        </NoSsr>
        <Grid container spacing={1}>
          {cards}
        </Grid>
      </>
  );
};
