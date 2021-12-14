//******** Note Router *********
//================================

class NoteRouter {
    constructor(noteService, express) {
        this.noteService = noteService;
        this.express = express
    }

    router() {
        let router = this.express.Router();
        router.get('/', this.get.bind(this))
        router.post('/', this.post.bind(this))
        router.put('/:id', this.put.bind(this))
        router.delete('/:id', this.delete.bind(this))
        return router;
    }

    // 1. GET Method
    // ==================================
    get(req, res) {
        return (this.noteService
            .list(req.session.passport.user.username)
            .then((notesArr) => {
                let notes = notesArr.map((a) => a['note'])
                res.json(notes)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            }));
    }

    // 2. POST Method
    // ==================================
    post(req, res) {
        return (this.noteService
            .add(req.body.note, req.session.passport.user.username)
            .then((notesArr) => {
                let notes = notesArr.map((a) => a['note'])
                res.json(notes)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            })
        );
    }

    // 3. PUT Method
    // ==================================
    put(req, res) {
        return (this.noteService
            .update(req.params.id, req.body.note, req.session.passport.user.username)
            .then((notesArr) => {
                let notes = notesArr.map((a) => a['note'])
                res.json(notes)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            })
        );
    }

    // 4. DELETE Method
    // ==================================
    delete(req, res) {
        return (this.noteService
            .remove(req.params.id, req.session.passport.user.username)
            .then((notesArr) => {
                let notes = notesArr.map((a) => a['note'])
                res.json(notes)
            })
            .catch((err) => {
                res.status(500)
                return res.json(err)
            })
        );
    }
}

module.exports = NoteRouter;