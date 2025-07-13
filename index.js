const express = require( 'express' );
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const HOSTNAME = process.env.HOSTNAME || "http://localhost";
const PORT = process.env.PORT || 3000;

// app.use( cors() ); // Allows all origins

// Set up CORS to allow only the specific origin.
app.use( cors(
    {
        origin: function ( origin, callback )
        {
            // If there's no origin (like curl or mobile apps), allow it.
            if (!origin)
            {
                return callback( null, true );
            }

            const allowedOrigin = `${ HOSTNAME }:${ process.env.ALLOWED_ORIGIN_PORT }`;
            if (origin === allowedOrigin)
            {
                callback( null, true );
            }
            else
            {
                callback( new Error( 'Not allowed by CORS' ) );
            }
        }
    }
) );

// Middleware to parse JSON
app.use( express.json() );

// APIs

let users = [];

app.get( '/users', ( req, res ) =>
{
    res.json( users );
});

app.post( '/add-user', ( req, res ) =>
{
    if (isEmpty( req.body.name ))
    {
        return res.status( 400 ).json( { "message": "invalid name" } );
    }

    if (isEmpty( req.body.gender ))
    {
        return res.status( 400 ).json( { "message": "invalid gender" } );
    }

    const newUser =
    {
        id: users.length + 1,
        name: req.body.name,
        gender: req.body.gender,
        message: req.body.message
    };

    users.push( newUser );
    res.status( 201 ).json( newUser );
}
);

app.delete( '/delete-all-users', ( req, res ) =>
{
    users = [];
    res.status( 200 ).json();
}
);

// Start server
app.listen( PORT, () =>
{
    console.log( `Server running on ${ HOSTNAME }:${ PORT }` );
}
);

function isEmpty( value )
{
    return value === null || value === undefined || value === '';
}
