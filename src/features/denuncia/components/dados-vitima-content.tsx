import React from 'react';
import { useForm } from 'react-hook-form';
import { ReportFormData, UpdateFormData } from './report-types';
import '../denuncia-page-style.css';

interface StepOneProps {
  formData: ReportFormData;
  updateFormData: UpdateFormData;
  nextStep: () => void;
}

export const DadosVitimaContent: React.FC<StepOneProps> = ({ formData, updateFormData, nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormData>({ defaultValues: formData });

  const onSubmit = (data: ReportFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-form">
      <h2 style={{ textAlign: 'center' }}>Dados da vítima</h2>
      <br />
      <div className="form-group">
        <label htmlFor="victimName">Nome da vítima</label>
        <input
          id="victimName"
          {...register("victimName", { required: "Nome da vítima é obrigatório" })}
        />
        {errors.victimName && <span className="error">{errors.victimName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Data de nascimento</label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate", { required: "Data de nascimento é obrigatória" })}
        />
        {errors.birthDate && <span className="error">{errors.birthDate.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Sexo do paciente</label>
        <select
          id="gender"
          {...register("gender", { required: "Sexo do paciente é obrigatório" })}
        >
          <option value="">Selecione</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>
        {errors.gender && <span className="error">{errors.gender.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Endereço do paciente</label>
        <textarea
          id="address"
          {...register("address", { required: "Endereço do paciente é obrigatório" })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          {...register("description", {
            required: "Descrição é obrigatória",
            minLength: {
              value: 10,
              message: "A descrição deve ter no mínimo 150 caracteres"
            }
          })}
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </div>

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="isAnonymous"
          {...register("isAnonymous")}
        />
        <label htmlFor="isAnonymous">Desejo fazer esta denúncia anonimamente</label>
      </div>

      <button type="submit" className="next-button">Próxima Etapa</button>
    </form>
  );
};
