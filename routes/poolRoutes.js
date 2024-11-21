const express = require('express');
const db = require('../Database/db');
const router = express.Router();

// Route untuk melihat semua kolam renang
router.get('/', (req, res) => {
    db.query('SELECT * FROM swimming_pools', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('index', {
            layout: 'layouts/main-layout',
            pools: results
        });
    });
});

// Route untuk menambah kolam renang baru
router.post('/', (req, res) => {
    const { name, location, description } = req.body;
    db.query('INSERT INTO swimming_pools (name, location, description) VALUES (?, ?, ?)', 
    [name, location, description], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.redirect('/pools'); // Setelah menambah, redirect ke halaman kolam renang
    });
});

// Route untuk mengedit kolam renang
router.get('/edit/:id', (req, res) => {
    const poolId = req.params.id;
    db.query('SELECT * FROM swimming_pools WHERE id = ?', [poolId], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Pool not found');
        res.render('edit', {
            layout: 'layouts/main-layout',
            pool: results[0]
        });
    });
});

router.post('/edit/:id', (req, res) => {
    const { name, location, description } = req.body;
    const poolId = req.params.id;
    db.query('UPDATE swimming_pools SET name = ?, location = ?, description = ? WHERE id = ?',
    [name, location, description, poolId], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.redirect('/pools');
    });
});

// Route untuk menghapus kolam renang
router.post('/delete/:id', (req, res) => {
    const poolId = req.params.id;
    db.query('DELETE FROM swimming_pools WHERE id = ?', [poolId], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.redirect('/pools');
    });
});

module.exports = router;
