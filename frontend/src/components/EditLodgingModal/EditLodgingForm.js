import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {editLodging} from '../../store/lodgings'
import './EditLodgingForm.css'

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL',
  'IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT',
  'NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
  'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const CATEGORIES = [
  {
    id: 1,
    type: 'Hotel'
  },
  {
    id: 2,
    type: 'Inn'
  },
  {
    id: 3,
    type: 'Bed & Breakfast'
  },
  {
    id: 4,
    type: 'Cabin'
  },

]

function EditLodgingForm({lodgingId, setShowModal}) {

  const lodging = useSelector(state => state.lodgings[lodgingId]);
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState(lodging.name);
  const [imgUrl, setImgUrl] = useState(lodging.Images[0].imgUrl);
  const [addressLineOne, setAddressLineOne] = useState(lodging.Address.addressLineOne)
  const [addressLineTwo, setAddressLineTwo] = useState(lodging.Address.addressLineTwo)
  const [city, setCity] = useState(lodging.Address.city)
  const [state, setState] = useState(lodging.Address.state)
  const [postalCode, setPostalCode] = useState(+lodging.Address.postalCode)
  const [country, setCountry] = useState(lodging.Address.country)
  const [description, setDescription] = useState(lodging.description)
  const [price, setPrice] = useState(lodging.price)
  const [breakfast, setBreakfast] = useState(lodging.breakfast)
  const [pool, setPool] = useState(lodging.pool)
  const [wifi, setWifi] = useState(lodging.wifi)
  const [categoryId, setCategoryId] = useState(lodging.Category.id);
  const [errors, setErrors] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()



  useEffect(() => {
    const errors = []
    if (name.length === 0) errors.push("Lodging Name is required")
    if (name.length > 30) errors.push("Name must be 30 characters or less")
    if (imgUrl.length === 0) errors.push("Image URL is required")
    if (addressLineOne.length === 0) errors.push("Address Line 1 is required")
    if (city.length === 0) errors.push("City is required")
    if (city.length > 30) errors.push("City field must be 30 characters or less")
    if (state.length === 0) errors.push("State is required")
    if (state.length > 2) errors.push("State field must be 2 characters: ie CA for California")
    if (postalCode.length === 0) errors.push("Zip Code is required")
    if (postalCode.length !== 5) errors.push("Zip field must be 5 digits")
    if (country.length === 0) errors.push("Country field is required")
    if (country.length > 30) errors.push("Country field must be 30 characters or less")
    if (description.length === 0) errors.push("Description field is required")
    if (description.length > 1000) errors.push("Description field must be 1000 characters or less")
    if (price.length === 0) errors.push("Price field is required")
    setErrors(errors)
  }, [name, addressLineOne, city, state, postalCode, country, description, price])

  const handleSubmit = (e) => {

    e.preventDefault()

    const payload = {
      addressLineOne,
      addressLineTwo,
      city,
      state,
      postalCode,
      country,
      name,
      id: user.id,
      description,
      categoryId,
      wifi,
      price,
      breakfast,
      pool,
      imgUrl,
    }

    return dispatch(editLodging(lodgingId, payload)).then(() => setShowModal(false))
      .then(() => history.push(`/lodgings/${lodgingId}`))

  }

  return (
    <div className="overflow">
      <div className="EditLodgingForm">
        <form
          className="edit-lodging-form"
          onSubmit={handleSubmit}
        >
          <h2>Update {lodging.name}</h2>
          <div className="form-group">
            <input
              placeHolder="Lodging Name"
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              placeHolder="Image URL .png or .jpg"
              type="text"
              name="imgUrl"
              value={imgUrl}
              onChange={(event) => setImgUrl(event.target.value)}
            />
            <input
              placeHolder="Address Line 1"
              type="text"
              name="addressLineOne"
              value={addressLineOne}
              onChange={(event) => setAddressLineOne(event.target.value)}
            />
            <input
              placeHolder="Address Line 2"
              type="text"
              name="addressLineTwo"
              value={addressLineTwo}
              onChange={(event) => setAddressLineTwo(event.target.value)}
            />
            <input
              placeHolder="City"
              type="text"
              name="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <select
              placeHolder="Select State"
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option value="" disabled selected>Select a State</option>
              {STATES.map(state => (
                <option
                  key={state}
                >
                  {state}
                </option>
              ))}
            </select>
            <input
              placeHolder="Zip Code"
              type="text"
              name="postalCode"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />
            <input
              placeHolder="Country"
              type="text"
              name="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <select
              placeHolder="Select Category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="" disabled selected>Select a Category</option>
              {CATEGORIES.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.type}
                </option>
              ))}
            </select>
              <div className="checkbox-group">
                <label className="wifi-label">
                  Free Wifi:
                  <input
                    className="wifi-checkbox"
                    type="checkbox"
                    name="wifi"
                    value={wifi}
                    onChange={(event) => setWifi(event.target.checked)}
                  />
                </label>
                <label className="pool-label">
                  Pool:
                  <input
                    className="pool-checkbox"
                    type="checkbox"
                    name="pool"
                    value={pool}
                    onChange={(event) => setPool(event.target.checked)}
                  />
                </label>
                <label className="breakfast-label">
                    Free Breakfast:
                    <input
                      className="breakfast-checkbox"
                      type="checkbox"
                      name="breakfast"
                      value={breakfast}
                      onChange={(event) => setBreakfast(event.target.checked)}
                    />
                  </label>
              </div>
              <textarea
                className="lodging-description"
                placeHolder="Description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <input
                placeHolder="Price per night"
                type="text"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <ul className="errors">
                {errors.map(error => (
                <li key={error}>
                *** {error}
                </li>
                ))}
              </ul>
              <button
                className="update-button"
                type="submit"
                disabled={errors.length > 0}
              >
                Update Accommodation
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLodgingForm;
