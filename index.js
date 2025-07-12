const express = require( 'express' );
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use( cors() ); // allows all origins

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
    console.log( `Server running on http://localhost:${PORT}` );
}
);

function isEmpty( value )
{
    return value === null || value === undefined || value === '';
}
