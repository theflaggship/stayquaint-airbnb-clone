import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import createLodging from '../../store/lodgings'

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL',
  'IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT',
  'NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
  'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const CATEGORIES = [
    'Hotel',
    'Inn',
    'Bed & Breakfast',
    'Cabin'
]

// const CATEGORIES = [
//   {
//     id: 1,
//     type: 'Hotel'
//   },
//   {
//     id: 2,
//     type: 'Inn'
//   }
// ]

function NewLodgingForm({lodgings}) {

  const [name, setName] = useState('Test');
  const [imgUrl, setImgUrl] = useState('test.png');
  const [addressLineOne, setAddressLineOne] = useState('test')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [city, setCity] = useState('test')
  const [state, setState] = useState('te')
  const [postalCode, setPostalCode] = useState('99999')
  const [country, setCountry] = useState('test')
  const [description, setDescription] = useState('test')
  const [price, setPrice] = useState('100')
  const [breakfast, setBreakfast] = useState(false)
  const [pool, setPool] = useState(false)
  const [wifi, setWifi] = useState(false)
  const [categoryId, setCategoryId] = useState(1);
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
      <label>
        Lodging Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
       </label>
      <label>
        Address Line 1:
        <input
          type="text"
          name="addressLineOne"
          value={addressLineOne}
          onChange={(event) => setAddressLineOne(event.target.value)}
        />
      </label>
      <label>
        Address Line 2:
        <input
          type="text"
          name="addressLineTwo"
          value={addressLineTwo}
          onChange={(event) => setAddressLineTwo(event.target.value)}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
       </label>
       <label>
        Select a State:
        <select
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
       </label>
       <label>
        Zip Code:
        <input
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
        />
       </label>
       <label>
        Country:
        <input
          type="text"
          name="country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
       </label>
       <label>
        Select a Category
        <select
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
      </label>
      <label>
          Free Wifi:
          <input
            type="checkbox"
            name="wifi"
            value={wifi}
            onChange={(event) => setWifi(event.target.checked)}
          />
        </label>
        <label>
          Pool:
          <input
            type="checkbox"
            name="pool"
            value={pool}
            onChange={(event) => setPool(event.target.checked)}
          />
        </label>
        <label>
            Free Breakfast:
            <input
              type="checkbox"
              name="breakfast"
              value={breakfast}
              onChange={(event) => setBreakfast(event.target.checked)}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
      <button
        type="submit"
        disabled={errors.length > 0}
      >
        Creat Accommodation
      </button>
    </form>
  );
}

export default NewLodgingForm;
