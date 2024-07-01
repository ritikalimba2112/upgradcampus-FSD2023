import * as React from 'react';
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { confirmItemDeletion } from '../../store/actions/productCardActions'
import { requestConfirmItemDeletion } from '../../store/actions/productCardActions'
import ConfirmationDialog from '../../commons/ConfirmationDialog/ConfirmationDialog';
import "./ProductCard.css"

function ProductCard({ product, isAdmin = false, onRequestConfirmItemDeletion }) {
  const { id, name, category, price, description, manufacturer, availableItems, imageUrl } = product
  const [Itemname, setItemname] = useState(name)
  const [ItemPrice, setItemPrice] = useState(price)
  const [Description, setDescription] = useState(description)
  const [ItemImg, setItemImg] = useState(imageUrl)
  const truncate = (input, maxLength = 100) => input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;

  return (

    <Card className="ProductCard" >

      <Link to={`/${id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          className="ProductCard__image"
          image={ItemImg}
          title={Itemname}
        />
      </Link>

      <CardContent >
        <Stack spacing={4} direction="row" style={{ display: "flex", marginLeft: 'auto', height: "60px" }}>
          <Typography
            gutterBottom
            variant="h6"
            style={{ flexGrow: 1, "fontWeight": "bold" }}>
            {truncate(Itemname, 40)}
          </Typography>
          <Typography
            gutterBottom variant="h6"
            component="div"
            style={{ marginLeft: 'auto' }}>
            {"$" + ItemPrice}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ minHeight: "50px" }}>
          {truncate(Description)}
        </Typography>
      </CardContent>

      <CardActions style={{ marginTop: "auto", display: "flex" }}>
        {/* Buy button link to product detail */
          <Link
            to={`/${id}`}
            style={{ textDecoration: "none" }}>
            <Button
              className="BuyButton"
              size="small"
              variant="contained"
              style={{ marginRight: "auto", flexGrow: "1" }} >
              BUY
            </Button>
          </Link>}
        {isAdmin &&
          <Link to={`/edit/${id}`} style={{
            textDecoration: "none", marginLeft: "auto"
          }}>
            < IconButton >
              <EditIcon />
            </IconButton>
          </Link>}
        {
          isAdmin &&
          <IconButton onClick={(e) => onRequestConfirmItemDeletion(id)}>
            <DeleteIcon />
          </IconButton>
        }
      </CardActions >
    </Card >


  );
}

// let mapStateToProps = (state) => {
//   return {
//     productid2delete: state.productCard.productid2delete,
//     confirmingDeletion: state.productCard.confirmingDeletion,
//     confirmedDeletion: state.productCard.confirmedDeletion,
//     canceledDeletion: state.productCard.canceledDeletion
//   }
// }

let mapDispatchToProps = (dispatch) => {
  return {
    onRequestConfirmItemDeletion: (id) => dispatch(requestConfirmItemDeletion(id))
  }
}
export default connect(null, mapDispatchToProps)(ProductCard)