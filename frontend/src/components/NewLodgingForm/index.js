import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import createLodging from '../../store/lodgings'
import './NewLodgingFrom.css'

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

function NewLodgingForm({lodgings}) {

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [addressLineOne, setAddressLineOne] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [breakfast, setBreakfast] = useState(false)
  const [pool, setPool] = useState(false)
  const [wifi, setWifi] = useState(false)
  const [categoryId, setCategoryId] = useState(null);
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

  const handleSubmit = () => {
    const body = {
      addressLineOne,
      addressLineTwo,
      city,
      state,
      postalCode,
      country,
      name,
      description,
      categoryId,
      wifi,
      price,
      breakfast,
      pool,
      imgUrl,
    }
    dispatch(createLodging(body))
  }

  return (
    <form
      className="new-lodging-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Accommodation</h2>
      <ul className="errors">
        {errors.map(error => (
          <li key={error}>
            {error}
          </li>
        ))}
      </ul>
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
          <button
            className="create-button"
            type="submit"
            disabled={errors.length > 0}
          >
            Creat Accommodation
          </button>
      </div>
    </form>
  );
}

export default NewLodgingForm;
