import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "30px",
    paddingLeft:'10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    letterSpacing:'1.5',
  
  },
  sponser: {
    //   display:"flex",
    //   flexDirection: 'column',
    width:"100%",
    marginRight:'5px',
    textAlign:'left',
  }

}));

export default function VaccineBox({name, effect, sponser, detail}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
          
          <Typography className={classes.secondaryHeading}>
            {effect}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
           <div className={classes.sponser}>{sponser}</div>
          
          <Typography color="textSecondary">
         
          <div
  dangerouslySetInnerHTML={{
  __html: detail
  }}></div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
