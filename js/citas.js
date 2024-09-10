function mostrarCitas(){
    let request = sendRequest('citas', 'GET', '');
    let tabla = document.getElementById('citas-table');
    tabla.innerHTML="";
    request.onload =function () {
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
        tabla.innerHTML +=`

<tr>

<th>${element._id}</th>
<td>${element.n_medico}</td>
<td>${element.especialidad}</td>
<td>${element.fecha}</td>
<td>${element.duracion}</td>
<td>


<button type="button" class="boton-edit" onclick='window.location="/fomr_citas.html?id=${element.id}"' >Editar</button>
<button type="button" class="boton-elim" onclick='eliminarCitas(${element.id})' >Eliminar</button>  

</td>
</tr>
`

});

//cambios

}
request.onerror = function(){
    tabla.innerHTML = `
    <tr>
    <td colspan="">error al traer los datos</td>
    </tr>
    `

}


}

//funcion eliminar citas
function eliminarCitas(id) {
    let request = sendRequest('citas/' +id, 'DELETE', '');
    request.onload = function () {
        mostrarCitas();
    }
}

function guardarCitas() {
    let name =document.getElementById('nombre-m').value
    let esp = document.getElementById('especialidad-e').value
    let fec = document.getElementById('fecha-f').value
    let dur = document.getElementById('duracion-d').value
    let idi  = document.getElementById('cita-id').value
    let data = {'id':idi, 'n_medico':name, 'especialidad':esp, 'fecha': fec, 'duracion':dur }
    let request = sendRequest('citas/'+idi, idi ? 'PUT':'POST', data);
    request.onload = function() {
        window.location = 'citas.html';
    }
    request.onerror = function(){
        alert("Error al guardar los datos")
    }
}

function cargarDatos(id){
    let request = sendRequest('citas/'+id, 'GET', '');
    let name =document.getElementById('nombre-m')
    let esp = document.getElementById('especialidad-e')
    let fec = document.getElementById('fecha-f')
    let dur = document.getElementById('duracion-d')
    let idi = document.getElementById('cita-id')
    
    request.onload = function(){
        let data = request.response[0];

        
        name.value = data.n_medico
        esp.value = data.especialidad
        fec.value = data.fecha
        dur.value = data.duracion
        idi.value =data.id
        console.log(data)
 

    }
    request.onerror = function(){
        alert("Error al guardar los datos")

}
}