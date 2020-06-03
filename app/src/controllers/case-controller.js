const CaseModel = require('../models/case-model');

class CaseController {
    getCases(req, res) {
        CaseModel.getCases(res);
    }

    getCaseDetail(req, res) {
        const id = req.params.id;
        CaseModel.getCaseDetail(id, res);
    }

    myCasesAngeluz(req, res) {
        const id = req.params.id;
        CaseModel.myCasesAngeluz(id, res);
    }

    myCases(req, res) {
        const id = req.params.id;
        CaseModel.myCases(id, res);
    }

    addCase(req, res) {
        const data = req.body;
        CaseModel.addCase(data, res);
    }

    alterCase(req, res) {
        const id = req.params.id;
        const data = req.body;
        CaseModel.alterCase(id, data, res);
    }

    deleteCase(req, res) {
        const id = req.params.id;
        CaseModel.deleteCase(id, res);
    }
}

module.exports = new CaseController;