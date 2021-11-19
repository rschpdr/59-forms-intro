# Equivalência React Router v5 para v6

### Definição de rotas

**v6:**

```javascript
import { Routes, Route } from "react-router-dom";
import Componente from "./Componente";

return (
  <div>
    <Routes>
      // Independente de props, as rotas são iguais
      <Route path="/home" element={<Componente suaProp="arroz" />} />
    </Routes>
  </div>
);
```

**v5:**

```javascript
import { Switch, Route } from "react-router-dom";
import Componente from "./Componente";

return (
  <div>
    <Switch>
      // Rota sem precisar passar props
      <Route path="/home" component={Componente} />
      // Rota quando precisamos passar props
      <Route
        path="/home"
        render={(routeProps) => <Componente {...routeProps} suaProp="arroz" />}
      />
    </Switch>
  </div>
);
```

### Rotas com match exato

**v6:**

Na v6, as rotas comparam a URL com o path exatamente por padrão

**v5:**

Na v5, por padrão as rotas compara se a URL INCLUI a string de path. Para comparar exatamente, precisamos da prop booleana 'exact'

```javascript
import { Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

return (
  <div>
    <Switch>
      <Route exact path="/user" component={Profile} />
      // Para evitar que essa rota nunca seja retornada por a rota acima conter a
      palavra '/user' também, precisamos usar a prop 'exact'
      <Route exact path="/user/edit" component={EditProfile} />
    </Switch>
  </div>
);
```

### Renderizar apenas uma rota por vez

**v6:**

Na v6, o componente `<Routes>` renderiza somente o primeiro "match" de um `<Route>` com a URL do navegador. Caso você queira renderizar mais de um `<Route>` na mesma tela, precisa usar um path inclusivo:

```javascript
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

return (
  <div>
    <Routes>
      // As duas rotas serão renderizadas
      <Route path="/user/*" component={Profile} />
      // E essa segunda rota será renderizada na URL '/user/edit'
      <Route path="edit" component={EditProfile} />
    </Routes>
  </div>
);
```

**v5:**

Na v5, o esquema de "match" entre o path das rotas e a URL do navegador é sempre inclusivo, então `<Route>`'s que incluem as mesmas strings sempre são todas renderizadas

```javascript
import { Route } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

return (
  <div>
    // As duas rotas serão renderizadas
    <Route path="/user" component={Profile} />
    <Route path="/user/edit" component={EditProfile} />
  </div>
);
```

Se você quiser EVITAR esse comportamento, use o componente `<Switch>`

```javascript
import { Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

return (
  <div>
    // Somente a primeira ocorrência de "match" será renderizada, no caso a rota
    "/user"
    <Switch>
      <Route path="/user" component={Profile} />
      <Route path="/user/edit" component={EditProfile} />
    </Switch>
  </div>
);
```

### Navegação programática

**v6:**
Para redirecionar o navegador para outra página via código (sem depender do usuário navegar manualmente), precisamos do hook `'useNavigate'`

```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// A função 'navigate' redireciona a aplicação para a rota passada como argumento
axios
  .post("api.servidor.com/user", state)
  .then((response) => navigate("/profile"))
  .catch((err) => console.log(err));
```

**v5:**
Já na v5, precisamos do hook `'useHistory'`

```javascript
import { useHistory } from "react-router-dom";

const history = useHistory();

// A função 'push' redireciona a aplicação para a rota passada como argumento
axios
  .post("api.servidor.com/user", state)
  .then((response) => history.push("/profile"))
  .catch((err) => console.log(err));
```

### Estilos para links ativos

Um link é considerado ativo quando a URL do navegador é a mesma que a URL que esse link redireciona para, por exemplo:

```javascript
// Caso a URL do navegador esteja na rota "/home", o link abaixo será considerado ativo
<Link to="/home">Home</Link>
```

Podemos aplicar estilos de CSS específicos para links ativos usando o componente `<NavLink>`:

**v6:**

```javascript
// A classe do CSS 'active' será adicionada neste link somente quando ele estiver ativo
<NavLink
  to="/home"
  // isActive é uma prop injetada pelo React Router no NavLink
  className={({ isActive }) => `link ${isActive ? "active" : ""}`}
>
  Home
</NavLink>
```

**v5:**

```javascript
// A classe do CSS 'active' será adicionada neste link somente quando ele estiver ativo
<NavLink to="/home" className="link" activeClassName="active">
  Home
</NavLink>
```

### Acesso à parâmetros de rota

O acesso à parâmetros de rota continua o mesmo tanto na `v5` quanto na `v6`:

```javascript
import { useParams, Link } from "react-router-dom";

function Componente() {
  // Esse código abaixo funciona da mesma forma tanto na v5 quanto na v6
  const { id } = useParams();

  return (
    <div>
      <Link to={`/user/${id}`}>Editar</Link>
    </div>
  );
}
```
