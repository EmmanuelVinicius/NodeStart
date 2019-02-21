DROP TABLE IF EXISTS Pessoas;
CREATE TABLE Pessoas (
    Id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    UserRole TEXT NOT NULL,
    Nome TEXT NOT NULL,
    Sobrenome TEXT NOT NULL,
    Email TEXT NOT NULL,
    Senha TEXT NOT NULL
);

--create
INSERT INTO Pessoas (UserRole, Nome, Sobrenome, Email, Senha)
VALUES
    ('admin', 'Pastor', 'Israel', 'pastor.israel@serafinsdedeus.com.br', '1234'),
    ('admin', 'Profeta', 'Carmem', 'profeta.carmem@serafinsdedeus.com.br', '1234'),
    ('user', 'Anna', 'Luiza', 'anna.luiza@serafinsdedeus.com.br', '1234'),
    ('user', 'Alice', 'Lopes', 'alice.lopes@serafinsdedeus.com.br', '1234')

--read
SELECT * FROM Pessoas WHERE Nome = [nome]

--update
UPDATE Pessoas SET [campo] = [valor] WHERE Id = [id]

--delete
DELETE FROM Pessoas WHERE Id = [id]