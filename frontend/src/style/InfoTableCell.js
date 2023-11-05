import { TableCell, styled } from "@mui/material";
import exampleBody from "./exampleBody";

const InfoTableCell = styled(TableCell)(() => ({
  lineHeight: 1.5,
  ...exampleBody
  
}))

export default InfoTableCell;