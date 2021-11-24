import React, {useEffect, useState} from "react";
import {getRoles} from "../service/roleService";


const RoleInput = (props) => {


    const [roleView, setRoleView] = useState([]);
    const roleRef = React.createRef();
    const [role, setRole] = useState({
        role_customs: [
            {
                id: ''
            }
        ]
    });

    const [sp_role, setSp_role] = useState({
        sp_roles: [
            {
                id: '',
                check: false
            }
        ]
    })

    const [isSp, setIsSp] = useState(false);

    function loadRoles() {
        getRoles().then(value => {
            setRoleView(value.data);
        })
    }


    useEffect(() => {
        loadRoles()
    }, [])


    async function handleChange(event) {
        let id = parseInt(event.target.value);
        await setRole(id);
        for (let roleViewElement of roleView) {
            if (roleViewElement.id === id) {
                // have sp role
                if (roleViewElement.sp_roles.length > 0) {
                    await setIsSp(true)
                    break;
                }
            }
            await setIsSp(false);
        }
    }

    async function sp_role_change(event) {
        let id = parseInt(event.target.value);
        let temp = [...sp_role.sp_roles]
        let index = temp.findIndex(value => value.id === id);
        if (index === -1) {
            temp.push({
                id: id,
                check: true
            })
        } else {
            temp[index].check = !temp[index].check;
        }
        await setSp_role({
            sp_roles: temp
        })

    }

    const spRole = () => {
        let sp_role = roleView.find(value => value.id === role);

        let ret = (
            <div className={"form-group margin-top"}>
                {sp_role.sp_roles.map(x => {
                    return (
                        <div key={x.id} className="form-check">
                            <input className="form-check-input" type="checkbox" value={x.id}
                                   onChange={sp_role_change}
                                   id={"sp_check_" + x.id}/>
                            <label className="form-check-label" htmlFor="sp_check">
                                {x.name}
                            </label>
                        </div>
                    )
                })}
            </div>


        );

        return ret;
    }

    async function handleRegis() {
        let sp_select = [];
        for (let spRole1 of sp_role.sp_roles) {
            if (spRole1.check) {
                sp_select.push(spRole1.id);
            }
        }
        props.handleSetRole(role, sp_select);
    }

    return (
        <div className={"col-6 mt-5 mx-auto card"}>
            <div className={"form-group"}>
                <label htmlFor="role_select">ประเภท</label>
                <select className="form-select" aria-label="" id="role_select"
                        onChange={handleChange} ref={roleRef}>
                    <option>ประเภท</option>
                    {roleView.map(value => (
                        <option key={value.id} value={value.id}>{value.role_name}</option>
                    ))}
                </select>
            </div>
            {isSp ? spRole() : ''}

            <div className={"text-center"}>
                <button className={"btn btn-outline-success"} onClick={handleRegis}>
                    register
                </button>
            </div>
        </div>
    )
}

export default (RoleInput);