# 📋 Requisitos del Proyecto Globde

[⬅ Volver al README principal](../README.md)

Este documento indexa las **33 Historias de Usuario** y sus **33 Casos de Uso** correspondientes,
organizados por módulo funcional. Cada uno tiene su propio archivo con el detalle completo,
incluyendo criterios de aceptación y diagramas de flujo.

---

## Autenticación y Acceso

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-01](requisitos/HUs/HU-01_registrar_nuevos_usuarios_al_sistema_ing.md) | registrar nuevos usuarios al sistema ingresando informa... | [CU-01](requisitos/CUs/CU-01_registro_de_usuario.md) | Registro de Usuario |
| [HU-02](requisitos/HUs/HU-02_iniciar_sesion_en_el_sistema_ingresando.md) | iniciar sesión en el sistema ingresando mi correo elect... | [CU-02](requisitos/CUs/CU-02_inicio_de_sesion.md) | Inicio de Sesión |
| [HU-03](requisitos/HUs/HU-03_recuperar_mi_contrasena_olvidada_ingresa.md) | recuperar mi contraseña olvidada ingresando mi correo e... | [CU-03](requisitos/CUs/CU-03_recuperacion_de_contrasena.md) | Recuperación de Contraseña |

## Gestión de Clientes, Servicios y Barberos

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-04](requisitos/HUs/HU-04_registrar_clientes_ingresando_informacio.md) | registrar clientes ingresando información como nombre, ... | [CU-04](requisitos/CUs/CU-04_registro_de_clientes.md) | Registro de Clientes |
| [HU-05](requisitos/HUs/HU-05_buscar_un_cliente_en_el_sistema_mediante.md) | buscar un cliente en el sistema mediante su nombre o nú... | [CU-05](requisitos/CUs/CU-05_busqueda_de_clientes.md) | Búsqueda de Clientes |
| [HU-06](requisitos/HUs/HU-06_eliminar_el_registro_de_un_cliente_del_s.md) | eliminar el registro de un cliente del sistema cuando y... | [CU-06](requisitos/CUs/CU-06_eliminacion_de_cliente.md) | Eliminación de Cliente |
| [HU-07](requisitos/HUs/HU-07_registrar_los_diferentes_servicios_que_o.md) | registrar los diferentes servicios que ofrece la barber... | [CU-07](requisitos/CUs/CU-07_registro_de_servicios.md) | Registro de Servicios |
| [HU-08](requisitos/HUs/HU-08_desactivar_temporalmente_un_servicio_del.md) | desactivar temporalmente un servicio del catálogo para ... | [CU-08](requisitos/CUs/CU-08_desactivacion_de_servicio.md) | Desactivación de Servicio |
| [HU-09](requisitos/HUs/HU-09_registrar_los_barberos_del_negocio_con_i.md) | registrar los barberos del negocio con información como... | [CU-09](requisitos/CUs/CU-09_registro_de_barberos.md) | Registro de Barberos |

## Disponibilidad y Agendamiento de Citas

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-10](requisitos/HUs/HU-10_asignar_un_horario_de_trabajo_a_cada_bar.md) | asignar un horario de trabajo a cada barbero indicando ... | [CU-10](requisitos/CUs/CU-10_configuracion_de_disponibilidad_de_barbe.md) | Configuración de Disponibilidad de Barberos |
| [HU-11](requisitos/HUs/HU-11_ver_el_perfil_de_cada_barbero_con_su_nom.md) | ver el perfil de cada barbero con su nombre, especialid... | [CU-11](requisitos/CUs/CU-11_consulta_de_perfil_de_barbero.md) | Consulta de Perfil de Barbero |
| [HU-12](requisitos/HUs/HU-12_agendar_citas_para_los_clientes_registra.md) | agendar citas para los clientes registrando información... | [CU-12](requisitos/CUs/CU-12_agendamiento_de_citas_barbero.md) | Agendamiento de Citas (Barbero) |
| [HU-13](requisitos/HUs/HU-13_seleccionar_una_fecha_y_un_horario_dispo.md) | seleccionar una fecha y un horario disponible para agen... | [CU-13](requisitos/CUs/CU-13_reserva_de_cita_en_linea_cliente.md) | Reserva de Cita en Línea (Cliente) |
| [HU-14](requisitos/HUs/HU-14_visualizar_las_citas_programadas_en_la_a.md) | visualizar las citas programadas en la agenda del siste... | [CU-14](requisitos/CUs/CU-14_visualizacion_de_agenda_del_barbero.md) | Visualización de Agenda del Barbero |
| [HU-15](requisitos/HUs/HU-15_cambiar_el_estado_de_una_cita_a_pendient.md) | cambiar el estado de una cita a pendiente, en atención ... | [CU-15](requisitos/CUs/CU-15_cambio_de_estado_de_cita.md) | Cambio de Estado de Cita |
| [HU-16](requisitos/HUs/HU-16_buscar_y_filtrar_citas_en_el_sistema_por.md) | buscar y filtrar citas en el sistema por fecha, barbero... | [CU-16](requisitos/CUs/CU-16_busqueda_y_filtrado_de_citas.md) | Búsqueda y Filtrado de Citas |
| [HU-17](requisitos/HUs/HU-17_cancelar_una_cita_previamente_agendada_d.md) | cancelar una cita previamente agendada desde mi perfil ... | [CU-17](requisitos/CUs/CU-17_cancelacion_de_cita_por_el_cliente.md) | Cancelación de Cita por el Cliente |

## Calificaciones, Historial y Notificaciones

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-18](requisitos/HUs/HU-18_calificar_el_servicio_recibido_despues_d.md) | calificar el servicio recibido después de que mi cita h... | [CU-18](requisitos/CUs/CU-18_calificacion_del_servicio.md) | Calificación del Servicio |
| [HU-19](requisitos/HUs/HU-19_ver_el_historial_completo_de_mis_citas_a.md) | ver el historial completo de mis citas anteriores con e... | [CU-19](requisitos/CUs/CU-19_consulta_de_historial_de_citas_del_clien.md) | Consulta de Historial de Citas del Cliente |
| [HU-20](requisitos/HUs/HU-20_recibir_un_recordatorio_automatico_por_c.md) | recibir un recordatorio automático por correo electróni... | [CU-20](requisitos/CUs/CU-20_envio_de_recordatorios_automaticos.md) | Envío de Recordatorios Automáticos |
| [HU-21](requisitos/HUs/HU-21_recibir_una_alerta_en_el_panel_del_siste.md) | recibir una alerta en el panel del sistema cuando un cl... | [CU-21](requisitos/CUs/CU-21_alerta_de_cancelacion_al_administrador.md) | Alerta de Cancelación al Administrador |
| [HU-22](requisitos/HUs/HU-22_enviar_notificaciones_masivas_a_los_clie.md) | enviar notificaciones masivas a los clientes sobre prom... | [CU-22](requisitos/CUs/CU-22_envio_de_notificaciones_masivas.md) | Envío de Notificaciones Masivas |

## Programa de Fidelización (Puntos)

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-23](requisitos/HUs/HU-23_acumular_puntos_automaticamente_cada_vez.md) | acumular puntos automáticamente cada vez que completo u... | [CU-23](requisitos/CUs/CU-23_acumulacion_de_puntos_por_cita.md) | Acumulación de Puntos por Cita |
| [HU-24](requisitos/HUs/HU-24_consultar_mi_saldo_de_puntos_acumulados.md) | consultar mi saldo de puntos acumulados y el historial ... | [CU-24](requisitos/CUs/CU-24_consulta_de_saldo_y_movimientos_de_punto.md) | Consulta de Saldo y Movimientos de Puntos |
| [HU-25](requisitos/HUs/HU-25_configurar_la_cantidad_de_puntos_que_oto.md) | configurar la cantidad de puntos que otorga cada servic... | [CU-25](requisitos/CUs/CU-25_configuracion_de_puntos_por_servicio.md) | Configuración de Puntos por Servicio |
| [HU-26](requisitos/HUs/HU-26_registrar_el_canje_de_puntos_de_un_clien.md) | registrar el canje de puntos de un cliente como descuen... | [CU-26](requisitos/CUs/CU-26_canje_de_puntos.md) | Canje de Puntos |

## Configuración del Negocio

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-27](requisitos/HUs/HU-27_configurar_el_horario_de_atencion_del_ne.md) | configurar el horario de atención del negocio indicando... | [CU-27](requisitos/CUs/CU-27_configuracion_de_horario_de_atencion.md) | Configuración de Horario de Atención |
| [HU-28](requisitos/HUs/HU-28_registrar_dias_festivos_o_cierres_especi.md) | registrar días festivos o cierres especiales del negoci... | [CU-28](requisitos/CUs/CU-28_registro_de_dias_no_laborales.md) | Registro de Días No Laborales |

## Reportes Administrativos

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-29](requisitos/HUs/HU-29_ver_un_reporte_de_ingresos_del_negocio_f.md) | ver un reporte de ingresos del negocio filtrado por per... | [CU-29](requisitos/CUs/CU-29_reporte_de_ingresos.md) | Reporte de Ingresos |
| [HU-30](requisitos/HUs/HU-30_ver_un_ranking_de_los_servicios_mas_soli.md) | ver un ranking de los servicios más solicitados por los... | [CU-30](requisitos/CUs/CU-30_ranking_de_servicios_mas_solicitados.md) | Ranking de Servicios más Solicitados |
| [HU-31](requisitos/HUs/HU-31_ver_un_reporte_del_desempeno_individual.md) | ver un reporte del desempeño individual de cada barbero... | [CU-31](requisitos/CUs/CU-31_reporte_de_desempeno_por_barbero.md) | Reporte de Desempeño por Barbero |
| [HU-32](requisitos/HUs/HU-32_exportar_los_reportes_generados_en_el_si.md) | exportar los reportes generados en el sistema en format... | [CU-32](requisitos/CUs/CU-32_exportacion_de_reportes.md) | Exportación de Reportes |

## Lista de Espera

| HU | Historia de Usuario | CU | Caso de Uso |
|---|---|---|---|
| [HU-33](requisitos/HUs/HU-33_inscribirme_en_una_lista_de_espera_cuand.md) | inscribirme en una lista de espera cuando todos los hor... | [CU-33](requisitos/CUs/CU-33_gestion_de_lista_de_espera.md) | Gestión de Lista de Espera |

---

[⬅ Volver al README principal](../README.md)
