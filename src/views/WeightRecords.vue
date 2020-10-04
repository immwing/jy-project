<template>
  <div>
    <el-card class="box-card">
      <!-- Card header -->
      <div slot="header" class="clearfix">
        <span>Weight Records</span>
      </div>
      <!-- Weight record table -->
      <el-table :data="records.slice(pageSize*page-pageSize, pageSize*page)">
        <el-table-column min-width="90px" prop="date" label="Date" sortable></el-table-column>
        <el-table-column min-width="70px" prop="weight" label="Weight (Kg)"></el-table-column>
        <el-table-column prop="workout"  label="Workout" sortable></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button type="primary" @click="openDialog('create')">Create</el-button>
          </template>
          <!-- Handle button of each row -->
          <template slot-scope="scope">
            <el-button type="warning" circle icon="el-icon-edit" @click="openDialog('edit', scope.row)"></el-button>
            <el-button type="danger" circle icon="el-icon-delete" @click="handleDelete(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="records.length"
        @current-change="setPage"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="Create record" :visible.sync="recordDialogForm" width="90%">
      <el-form :model="newRecord" :label-position="'left'" label-width="120px">
        <el-form-item label="Date">
          <el-input v-model="newRecord.date" autocomplete="off" :disabled="disabledDate"></el-input>
        </el-form-item>
        <el-form-item label="Weight (Kg)">
          <el-input v-model="newRecord.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Workout">
          <el-checkbox-group v-model="newRecord.workout">
            <el-checkbox label="Running" name="type"></el-checkbox>
            <el-checkbox label="Pushup" name="type"></el-checkbox>
            <el-checkbox label="Swimming" name="type"></el-checkbox>
            <el-checkbox label="Pullup" name="type"></el-checkbox>
            <el-checkbox label="HIIT" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="handleForm(recordDialogAction, newRecord)">Submit</el-button>
          <el-button type="danger" @click="handleReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      recordDialogForm: false,
      recordDialogAction: '',
      records: [],
      newRecord: {
        id: '',
        weight: '',
        date: '',
        workout: [],
      },
      disabledDate: false,
      page: 1,
      pageSize: 10
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    setPage(val) {
      this.page = val
    },
    getRecords() {
      axios.get('http://192.168.1.103:3000/api/')
      .then(res => {
        this.records = res.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    openDialog(action, data) {
      this.recordDialogForm = true
      this.recordDialogAction = action
      if(action === 'create') {
        this.disabledDate = false
        this.newRecord = {
          date: moment(new Date()).format('YYYY/MM/DD'),
          weight: null,
          workout: []
        }
      } else {
        this.disabledDate = true
        this.newRecord = {
          id: data._id,
          weight: data.weight,
          date: data.date,
          workout: data.workout
        }
      }
    },
    handleReset() {
      this.newRecord.weight = ''
      this.newRecord.workout = []
    },
    handleForm(action, data) {
      if(action == 'create'){
        for(var i in this.records){
          if(this.records[i].date.includes(data.date)){
            this.$message({
              type: 'warning',
              message: 'Record of date is existed'
            })
            return;
          }
        }
        axios.post('http://192.168.1.103:3000/api/create-record', data)
        .then(() => {
          this.recordDialogForm = false
          this.newRecord = {
            weight: '',
            date: '',
            workout: [],
          },
          this.getRecords()
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        axios.post(`http://192.168.1.103:3000/api/update-record/${data.id}`, data)
        .then(() => {
          this.recordDialogForm = false
          this.getRecords()
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    handleDelete(id){
      let indexOfArrayItem = this.records.findIndex(i => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios.delete(`http://192.168.1.103:3000/api/delete-record/${id}`)
        .then(() => {
          this.records.splice(indexOfArrayItem, 1)
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  }
}
</script>


<style scoped>
.el-card {
  margin: 15px 0px;
}
</style>