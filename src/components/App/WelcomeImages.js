import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Image from 'react-bootstrap/Image'

const WelcomeImages = (props) => {
  if (!props.user) {
    return (
      <Grid columns={3} rows={'minmax(45px,auto) minmax(45px,auto) minmax(45px,auto)'}>
        <Cell center middle width={1}>
          <Image className="welcome-image" src='https://cdn.jemediacorp.com/tracyjongblog/uploads/2017/07/delicious-1853300_960_720-960x500.jpg' thumbnail/>
        </Cell>
        <Cell center middle width={1} left={2} top={2}>
          <Image className="welcome-image" src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/autumn-in-the-white-mountains-of-new-hampshire-royalty-free-image-841380450-1567025100.jpg' thumbnail/>
        </Cell>
        <Cell center middle width={1} left={3} top={3}>
          <Image className="welcome-image" src='https://www-kiva-org.global.ssl.fastly.net/cms/sites/default/files/kivablog/matheus-ferrero-228716-unsplash.jpg' thumbnail/>
        </Cell>
      </Grid>
    )
  } else {
    return null
  }
}

export default WelcomeImages
